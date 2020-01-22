{
  "targets": [
    {
      "target_name": "cpp",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [ "src/cpp.cc", "src/cppStrategy/cpptrader.cc" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    },
    {
      "target_name": "py",
      "cflags!": [ "-fno-exceptions", "-framework Python" ],
      "cflags_cc!": [ "-fno-exceptions", "-framework Python" ],
      "sources": [ "src/python.cc", "src/pythonStrategy/pythontrader.cc" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "<!(echo $PYTHON_INCLUDE)"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}
