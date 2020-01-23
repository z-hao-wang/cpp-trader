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
      "cflags!": [ "-fno-exceptions", "<!(python3-config --cflags)" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "link_settings": {
        "ldflags": [
            "<!(python3-config --ldflags)",
        ]
      },
      "sources": [ "src/python.cc", "src/pythonStrategy/pythontrader.cc" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "<!(python3-config --includes)"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}
