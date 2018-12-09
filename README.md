# @pm2/node-runtime-stats

## How does it work?

You can see most of the implementation details in `src/nativeStats.cc`. The plugin sets callbacks
around GC invocations, and during the `prepare` and `check` phases of the event loop, tracks the
amount of time spent in each.

## Metrics collected

```json
{
  "gc": {
    "collections": 0,
    "pause": 0,
    "oldCollections": 0,
    "oldPause": 0,
    "youngCollections": 0,
    "youngPause": 0
  },
  // duration of event loop tick
  "ticks": [
    20,
    10
  ]
}
```

## Source

Inspired from https://github.com/heroku/heroku-nodejs-plugin