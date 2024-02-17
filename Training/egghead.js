const exec = require("child_process").exec;
const fs = require("fs");
const { Readable } = require("stream");
const { finished } = require("stream/promises");

const MEDIA_SERVER = "https://d2c5owlt6rorc3.cloudfront.net";
const VIDEO_QUALITY = "720"; // 1080 or 720

// look for the /graphql request which queries the lession detail,
// the collection data is part of lession
//
// collection.slug      => the output directory
// lessons[i].thumb_url => the lesson "id"
const COLLECTION = {
  "id": 418653,
  "title": "Build Modern Layouts with CSS Grid",
  "slug": "build-modern-layouts-with-css-grid-d3f5",
  "type": "playlist",
  "square_cover_480_url": "https://d2eip9sf3oo6c2.cloudfront.net/playlists/square_covers/000/418/653/square_480/EGH_modern-layouts-css__1000.png",
  "path": "/courses/build-modern-layouts-with-css-grid-d3f5",
  "lessons": [
    {
      "slug": "css-define-root-colors-variables-and-set-up-box-sizing-for-a-css-layout",
      "type": "lesson",
      "path": "/lessons/css-define-root-colors-variables-and-set-up-box-sizing-for-a-css-layout",
      "title": "Define Root Colors Variables and Set up Box-Sizing for a CSS Layout",
      "completed": null,
      "duration": 68,
      "thumb_url": "https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-define-root-colors-variables-and-set-up-box-sizing-for-a-css-layout-alYiNXNFI/egghead-define-root-colors-variables-and-set-up-box-sizing-for-a-css-layout-alYiNXNFI.jpg",
      "media_url": "https://app.egghead.io/api/v1/lessons/css-define-root-colors-variables-and-set-up-box-sizing-for-a-css-layout/media"
    },
    {
      "slug": "css-introduction-to-css-grid-rows-and-columns-with-display-grid",
      "type": "lesson",
      "path": "/lessons/css-introduction-to-css-grid-rows-and-columns-with-display-grid",
      "title": "Introduction to CSS Grid Rows and Columns with display: grid",
      "completed": null,
      "duration": 83,
      "thumb_url": "https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-02-start-a-grid-layout-with-display-grid-qWTyqGTKW/egghead-02-start-a-grid-layout-with-display-grid-qWTyqGTKW.jpg",
      "media_url": "https://app.egghead.io/api/v1/lessons/css-introduction-to-css-grid-rows-and-columns-with-display-grid/media"
    },
    {
      "slug": "css-specify-a-gutter-in-css-grid-with-gap-grid-gap",
      "type": "lesson",
      "path": "/lessons/css-specify-a-gutter-in-css-grid-with-gap-grid-gap",
      "title": "Specify a Gutter in CSS Grid with gap (grid-gap)",
      "completed": null,
      "duration": 63,
      "thumb_url": "https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-03-specify-a-gutter-with-grid-gap-mCbNMpfr3/egghead-03-specify-a-gutter-with-grid-gap-mCbNMpfr3.jpg",
      "media_url": "https://app.egghead.io/api/v1/lessons/css-specify-a-gutter-in-css-grid-with-gap-grid-gap/media"
    },
    {
      "slug": "css-utilize-firefox-developer-tools-to-visualize-css-grid-styles",
      "type": "lesson",
      "path": "/lessons/css-utilize-firefox-developer-tools-to-visualize-css-grid-styles",
      "title": "Utilize Firefox Developer Tools to Visualize CSS Grid Styles",
      "completed": null,
      "duration": 47,
      "thumb_url": "https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-utilize-firefox-developer-tools-to-visualize-css-grid-styles-vQtD54chz/egghead-utilize-firefox-developer-tools-to-visualize-css-grid-styles-vQtD54chz.jpg",
      "media_url": "https://app.egghead.io/api/v1/lessons/css-utilize-firefox-developer-tools-to-visualize-css-grid-styles/media"
    },
    {
      "slug": "css-determine-css-grid-sizing-with-the-fraction-unit-fr",
      "type": "lesson",
      "path": "/lessons/css-determine-css-grid-sizing-with-the-fraction-unit-fr",
      "title": "Determine CSS Grid Sizing with the Fraction Unit (fr)",
      "completed": null,
      "duration": 186,
      "thumb_url": "https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-05-determine-grid-sizing-with-the-fraction-unit-fr-YJcS_jVdl/egghead-05-determine-grid-sizing-with-the-fraction-unit-fr-YJcS_jVdl.jpg",
      "media_url": "https://app.egghead.io/api/v1/lessons/css-determine-css-grid-sizing-with-the-fraction-unit-fr/media"
    },
    {
      "slug": "css-define-a-page-layout-with-css-grid-using-grid-template-areas",
      "type": "lesson",
      "path": "/lessons/css-define-a-page-layout-with-css-grid-using-grid-template-areas",
      "title": "Define a Page Layout with CSS Grid Using grid-template-areas",
      "completed": null,
      "duration": 315,
      "thumb_url": "https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-define-a-page-layout-with-css-grid-using-grid-template-areas-FLBpBc6rs/egghead-define-a-page-layout-with-css-grid-using-grid-template-areas-FLBpBc6rs.jpg",
      "media_url": "https://app.egghead.io/api/v1/lessons/css-define-a-page-layout-with-css-grid-using-grid-template-areas/media"
    },
    {
      "slug": "css-align-content-by-adding-styling-to-a-css-grid-layout",
      "type": "lesson",
      "path": "/lessons/css-align-content-by-adding-styling-to-a-css-grid-layout",
      "title": "Align Content by Adding Styling to a CSS Grid Layout",
      "completed": null,
      "duration": 106,
      "thumb_url": "https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-07-align-content-by-adding-styling-to-a-css-grid-layout-sowscA81a/egghead-07-align-content-by-adding-styling-to-a-css-grid-layout-sowscA81a.jpg",
      "media_url": "https://app.egghead.io/api/v1/lessons/css-align-content-by-adding-styling-to-a-css-grid-layout/media"
    },
    {
      "slug": "css-build-a-navigation-bar-with-css-grid-using-grid-auto-flow",
      "type": "lesson",
      "path": "/lessons/css-build-a-navigation-bar-with-css-grid-using-grid-auto-flow",
      "title": "Build a Navigation Bar with CSS Grid Using grid-auto-flow",
      "completed": null,
      "duration": 84,
      "thumb_url": "https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-08-build-a-navigation-bar-with-css-grid-UiVTWFXEv/egghead-08-build-a-navigation-bar-with-css-grid-UiVTWFXEv.jpg",
      "media_url": "https://app.egghead.io/api/v1/lessons/css-build-a-navigation-bar-with-css-grid-using-grid-auto-flow/media"
    },
    {
      "slug": "css-create-a-nested-css-grid-layout",
      "type": "lesson",
      "path": "/lessons/css-create-a-nested-css-grid-layout",
      "title": "Create a Nested CSS Grid Layout",
      "completed": null,
      "duration": 98,
      "thumb_url": "https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-09-create-a-nested-css-grid-layout-vtc9djkF6/egghead-09-create-a-nested-css-grid-layout-vtc9djkF6.jpg",
      "media_url": "https://app.egghead.io/api/v1/lessons/css-create-a-nested-css-grid-layout/media"
    },
    {
      "slug": "css-use-the-repeat-css-function-to-efficiently-define-css-grid-rows-and-columns",
      "type": "lesson",
      "path": "/lessons/css-use-the-repeat-css-function-to-efficiently-define-css-grid-rows-and-columns",
      "title": "Use the repeat() CSS Function to Efficiently Define CSS Grid Rows and Columns",
      "completed": null,
      "duration": 49,
      "thumb_url": "https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-10-use-the-repeat-function-to-efficiently-define-rows-and-columns-RJawMBxye/egghead-10-use-the-repeat-function-to-efficiently-define-rows-and-columns-RJawMBxye.jpg",
      "media_url": "https://app.egghead.io/api/v1/lessons/css-use-the-repeat-css-function-to-efficiently-define-css-grid-rows-and-columns/media"
    },
    {
      "slug": "css-define-size-range-with-the-minmax-css-function-to-create-responsive-grid-items",
      "type": "lesson",
      "path": "/lessons/css-define-size-range-with-the-minmax-css-function-to-create-responsive-grid-items",
      "title": "Define Size Range with the minmax() CSS Function to Create Responsive Grid Items",
      "completed": null,
      "duration": 78,
      "thumb_url": "https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-11-define-size-ranges-with-the-minmax-css-function-twGVJYI1t/egghead-11-define-size-ranges-with-the-minmax-css-function-twGVJYI1t.jpg",
      "media_url": "https://app.egghead.io/api/v1/lessons/css-define-size-range-with-the-minmax-css-function-to-create-responsive-grid-items/media"
    },
    {
      "slug": "css-create-a-responsive-layout-using-media-queries-with-css-grid",
      "type": "lesson",
      "path": "/lessons/css-create-a-responsive-layout-using-media-queries-with-css-grid",
      "title": "Create a Responsive Layout Using Media Queries with CSS Grid",
      "completed": null,
      "duration": 90,
      "thumb_url": "https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-12-create-a-responsive-layout-using-media-queries-with-css-grid-NfqMVW5j2/egghead-12-create-a-responsive-layout-using-media-queries-with-css-grid-NfqMVW5j2.jpg",
      "media_url": "https://app.egghead.io/api/v1/lessons/css-create-a-responsive-layout-using-media-queries-with-css-grid/media"
    },
    {
      "slug": "css-use-grid-auto-flow-and-media-queries-to-flip-navigation-from-horizontal-to-vertical",
      "type": "lesson",
      "path": "/lessons/css-use-grid-auto-flow-and-media-queries-to-flip-navigation-from-horizontal-to-vertical",
      "title": "Use grid-auto-flow and Media Queries to Flip Navigation from Horizontal to Vertical",
      "completed": null,
      "duration": 83,
      "thumb_url": "https://dcv19h61vib2d.cloudfront.net/thumbs/egghead-13-use-grid-auto-flow-to-flip-navigation-from-horizontal-to-vertical-LJSm2YNmQ/egghead-13-use-grid-auto-flow-to-flip-navigation-from-horizontal-to-vertical-LJSm2YNmQ.jpg",
      "media_url": "https://app.egghead.io/api/v1/lessons/css-use-grid-auto-flow-and-media-queries-to-flip-navigation-from-horizontal-to-vertical/media"
    }
  ]
}
  ;

async function execCmd(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  })
    .then((data) => ({ result: data }))
    .catch((err) => ({ err }));
}

async function fetchTextFromUrl(url) {
  console.log("fetching", url);
  const result = await fetch(url).then((response) => {
    return response.text();
  });

  return result;
}

async function downloadFile(url, path) {
  console.log("fetching", url);
  await finished(
    Readable.fromWeb((await fetch(url)).body).pipe(fs.createWriteStream(path))
  );
}

async function downloadLession({ slug, thumb_url, index, output }) {
  const lessonName = `${String(index).padStart(2, "0")}-${slug}`;
  const lessonId = thumb_url.split("/")[4];

  // fetch the lesson media meta, which contains available video detail
  const lessonMediaMetaUrl = [
    MEDIA_SERVER,
    lessonId,
    "hls",
    `${lessonId}.m3u8`,
  ].join("/");
  const mediaMeta = await fetchTextFromUrl(lessonMediaMetaUrl);
  const videoM3u8File = mediaMeta
    .split("\n")
    .filter((line) => line.endsWith("m3u8"))
    .find((line) => line.includes(VIDEO_QUALITY));

  // fetch the lession m3u8 file
  const lessonFhdUrl = [MEDIA_SERVER, lessonId, "hls", videoM3u8File].join("/");
  const parts = await fetchTextFromUrl(lessonFhdUrl);
  const tsFiles = parts.split("\n").filter((line) => line[0] !== "#");

  // clean up existing ts files before downloading
  await execCmd("rm -f *.ts");
  // download all video in the m3u8 file
  const tsFileDir = videoM3u8File.split("/")[0];
  await Promise.all(
    tsFiles.map((file) =>
      downloadFile(
        [MEDIA_SERVER, lessonId, "hls", tsFileDir, file].join("/"),
        file
      )
    )
  );

  // merge downloaded video (ts files)
  await execCmd(`mkdir ${output}`);
  await execCmd(
    [
      "ffmpeg -i",
      `"concat:${tsFiles.join("|")}"`,
      "-c copy",
      `${output}/${lessonName}.ts`,
    ].join(" ")
  );

  // clean up downloaded ts files
  await execCmd("rm -f *.ts");
}

async function downloadLessions({ lessons, output, index = 0 }) {
  if (index === lessons.length) {
    return;
  }

  await downloadLession({ ...lessons[index], output, index });

  downloadLessions({ lessons, output, index: index + 1 });
}

async function main() {
  // clean up existing collection before starting
  await execCmd(`rm -rf ${COLLECTION.slug}`);

  await downloadLessions({
    lessons: COLLECTION.lessons,
    output: COLLECTION.slug,
  });
}

main();
