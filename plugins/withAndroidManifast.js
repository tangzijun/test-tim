const { withAndroidManifest } = require("@expo/config-plugins");

function addAttributesToMainApplication(androidManifest, attributes) {
  const { manifest } = androidManifest;

  manifest.$ = {
    ...manifest.$,
    "xmlns:tools": "http://schemas.android.com/tools",
  };

  if (!Array.isArray(manifest["application"])) {
    console.warn(
      "withAndroidMainActivityAttributes: No application array in manifest?"
    );
    return androidManifest;
  }

  const application = manifest["application"].find(
    (item) => item.$["android:name"] === ".MainApplication"
  );
  if (!application) {
    console.warn("withAndroidMainActivityAttributes: No .MainApplication?");
    return androidManifest;
  }

  application.$ = { ...application.$, ...attributes };

  return androidManifest;
}

module.exports = function withAndroidMainActivityAttributes(
  config,
  attributes
) {
  return withAndroidManifest(config, (config) => {
    config.modResults = addAttributesToMainApplication(
      config.modResults,
      attributes
    );
    return config;
  });
};
