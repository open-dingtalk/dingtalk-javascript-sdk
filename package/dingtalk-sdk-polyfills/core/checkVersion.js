
/* @flow */

const versionRegExp = /^\s*\/\/ *(\{[^}]*\}) *\r?\n/;

function checkVersion (code:string) : Object {
  let info = {};
  const result = versionRegExp.exec(code)
  if (result) {
    try {
      info = JSON.parse(result[1])
    }
    catch (e) {}
  }
  return info
}

export default checkVersion;
