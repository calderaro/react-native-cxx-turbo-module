/**
 * @type {import('@react-native-community/cli-types').UserDependencyConfig}
 */
module.exports = {
  dependency: {
    platforms: {
      android: {
        cmakeListsPath: 'build/generated/source/codegen/jni/CMakeLists.txt',
        cxxModuleCMakeListsModuleName: 'react-native-awesome-library',
        cxxModuleCMakeListsPath: 'CMakeLists.txt',
        cxxModuleHeaderName: 'QRCodeModule',
      },
    },
  },
};
