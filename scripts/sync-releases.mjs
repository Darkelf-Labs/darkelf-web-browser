import { mkdir, rename, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import process from "node:process";
import { log, error } from "node:console";

const shadowRepository = "Darkelf-Labs/Darkelf-Shadow-CE";
const cocoaRepository = "Darkelf-Labs/Darkelf-Cocoa-Browser";

export function versionOf(tag) {
  return typeof tag === "string"
    ? /^(?:v\.?)?(\d{1,8}\.\d{1,8}\.\d{1,8})$/.exec(tag)?.[1]
    : undefined;
}

function compareVersions(a, b) {
  const left = versionOf(a.tag_name).split(".").map(Number);
  const right = versionOf(b.tag_name).split(".").map(Number);

  for (let i = 0; i < 3; i += 1) {
    if (left[i] !== right[i]) return right[i] - left[i];
  }

  return b.id - a.id;
}

function checkedUrl(value, prefix) {
  if (typeof value !== "string" || !value.startsWith(prefix)) {
    throw new Error("Release contains an unexpected GitHub URL.");
  }

  const url = new URL(value);

  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error("Release URL must use HTTPS without credentials.");
  }

  return value;
}

function highlightsFrom(notes, fallback) {
  let inCode = false;
  const highlights = [];

  for (const line of notes.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      inCode = !inCode;
      continue;
    }

    if (inCode || !/^\s*[-*]\s+/.test(line)) continue;

    const text = line
      .replace(/^\s*[-*]\s+/, "")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*`]/g, "")
      .trim();

    if (text) highlights.push(text);
    if (highlights.length === 6) break;
  }

  return highlights.length ? highlights : [fallback];
}

function selectStableRelease(input, productName) {
  if (!Array.isArray(input)) {
    throw new Error(`Invalid GitHub release response for ${productName}.`);
  }

  const stable = input
    .filter(
      (item) =>
        item &&
        !item.draft &&
        !item.prerelease &&
        versionOf(item.tag_name)
    )
    .sort(compareVersions);

  if (!stable[0]) {
    throw new Error(`No published stable ${productName} release found.`);
  }

  return stable[0];
}

function publishedDate(release) {
  const published = new Date(release.published_at);

  if (!Number.isFinite(published.getTime())) {
    throw new Error("Invalid publication date.");
  }

  return published.toISOString().slice(0, 10);
}

function releaseNotes(release) {
  const notes = typeof release.body === "string" ? release.body : "";

  if (!notes.trim()) {
    throw new Error("Add release notes before publishing the release.");
  }

  return notes;
}

function findDmg(release, filename) {
  const dmg = release.assets?.find(
    (asset) => asset.name === filename && asset.state === "uploaded"
  );

  if (!dmg || !Number.isSafeInteger(dmg.size) || dmg.size <= 0) {
    throw new Error(
      `Newest stable release ${versionOf(release.tag_name)} needs a finished ${filename} asset.`
    );
  }

  return dmg;
}

function releaseUrls(repository, release, filename, dmg) {
  const api = `https://api.github.com/repos/${repository}`;

  const releasePageUrl = checkedUrl(
    release.html_url,
    `https://github.com/${repository}/releases/tag/`
  );

  const downloadUrl = checkedUrl(
    dmg.browser_download_url,
    `https://github.com/${repository}/releases/download/`
  );

  const expectedPath =
    `/${repository}/releases/download/` +
    encodeURIComponent(release.tag_name) +
    "/" +
    encodeURIComponent(filename);

  if (new URL(downloadUrl).pathname !== expectedPath) {
    throw new Error(
      "DMG URL does not match the selected tag and asset name."
    );
  }

  return {
    releasePageUrl,
    downloadUrl,
    zipballUrl: checkedUrl(
      release.zipball_url,
      `${api}/zipball/`
    ),
  };
}

export function buildShadowRelease(input) {
  const release = selectStableRelease(input, "Shadow");
  const version = versionOf(release.tag_name);

  const filename = `Darkelf-Shadow-${version}.dmg`;
  const dmg = findDmg(release, filename);

  const urls = releaseUrls(
    shadowRepository,
    release,
    filename,
    dmg
  );

  const notes = releaseNotes(release);

  const artifacts = ["macos", "windows", "linux"].map(
    (platform) => ({
      platform,
      arch: "any",
      fileType: "pypi",
      url: "",
      installCommand:
        "pip install --upgrade darkelf-shadow",
    })
  );

  artifacts.push({
    platform: "macos",
    arch: "arm64",
    fileType: "dmg",
    url: urls.downloadUrl,
    sizeBytes: dmg.size,
    notesUrl: urls.releasePageUrl,
  });

  return {
    product: "shadow",
    channel: "stable",
    version,
    dateISO: publishedDate(release),
    releasePageUrl: urls.releasePageUrl,
    zipballUrl: urls.zipballUrl,
    highlights: highlightsFrom(
      notes,
      `Darkelf Shadow ${version}`
    ),
    notesMarkdown: notes,
    artifacts,
  };
}

export function buildCocoaRelease(input) {
  const release = selectStableRelease(input, "Cocoa");
  const version = versionOf(release.tag_name);

  const filename = `Darkelf-Cocoa-${version}.dmg`;
  const dmg = findDmg(release, filename);

  const urls = releaseUrls(
    cocoaRepository,
    release,
    filename,
    dmg
  );

  const notes = releaseNotes(release);

  return {
    product: "cocoa",
    channel: "stable",
    version,
    dateISO: publishedDate(release),
    releasePageUrl: urls.releasePageUrl,
    zipballUrl: urls.zipballUrl,
    highlights: highlightsFrom(
      notes,
      `Darkelf Cocoa ${version}`
    ),
    notesMarkdown: notes,

    artifacts: [
      {
        platform: "macos",
        arch: "any",
        fileType: "dmg",
        url: urls.downloadUrl,
        sizeBytes: dmg.size,
        notesUrl: urls.releasePageUrl,
      },
    ],
  };
}

async function getJson(url) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "Darkelf-Release-Sync",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization =
      `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await globalThis.fetch(url, {
    headers,
    redirect: "error",
    signal: globalThis.AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    throw new Error(
      `GitHub release fetch failed: HTTP ${response.status}`
    );
  }

  return response.json();
}

async function getPublishedReleases(repository) {
  const api =
    `https://api.github.com/repos/${repository}`;

  const releases = [];

  for (let page = 1; page <= 10; page += 1) {
    const batch = await getJson(
      `${api}/releases?per_page=100&page=${page}`
    );

    if (!Array.isArray(batch)) {
      throw new Error(
        `Invalid GitHub release list for ${repository}.`
      );
    }

    releases.push(...batch);

    if (batch.length < 100) break;

    if (page === 10) {
      throw new Error(
        `Release list exceeded pagination limit for ${repository}.`
      );
    }
  }

  return releases;
}

async function writeGeneratedRelease(
  filename,
  selected
) {
  const directory =
    new URL("../data/", import.meta.url);

  const output =
    new URL(filename, directory);

  const temporary =
    new URL(`${filename}.tmp`, directory);

  await mkdir(directory, {
    recursive: true,
  });

  await writeFile(
    temporary,
    `${JSON.stringify(selected, null, 2)}\n`,
    "utf8"
  );

  await rename(temporary, output);
}

async function main() {
  const [shadowInput, cocoaInput] =
    await Promise.all([
      getPublishedReleases(shadowRepository),
      getPublishedReleases(cocoaRepository),
    ]);

  const shadow =
    buildShadowRelease(shadowInput);

  const cocoa =
    buildCocoaRelease(cocoaInput);

  await Promise.all([
    writeGeneratedRelease(
      "shadow-release.generated.json",
      shadow
    ),

    writeGeneratedRelease(
      "cocoa-release.generated.json",
      cocoa
    ),
  ]);

  log(
    `Synced Darkelf Shadow ${shadow.version} from its published GitHub release.`
  );

  log(
    `Synced Darkelf Cocoa ${cocoa.version} from its published GitHub release.`
  );
}

if (
  process.argv[1] &&
  fileURLToPath(import.meta.url) === process.argv[1]
) {
  main().catch((problem) => {
    error(problem.message);
    process.exitCode = 1;
  });
}
