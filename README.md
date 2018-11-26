# @pm2/node-runtime-stats

## How does it work?

You can see most of the implementation details in `src/nativeStats.cc`. The plugin sets callbacks
around GC invocations, and during the `prepare` and `check` phases of the event loop, tracks the
amount of time spent in each.

## Metrics collected

```json
{
  "counters": {
    "node.gc.collections": 748,
    "node.gc.pause.ns": 92179835,
    "node.gc.old.collections": 2,
    "node.gc.old.pause.ns": 671054,
    "node.gc.young.collections": 746,
    "node.gc.young.pause.ns": 91508781
  },
  "gauges": {
    "node.eventloop.usage.percent": 0.12,
    "node.eventloop.delay.ms.median": 5,
    "node.eventloop.delay.ms.p95": 100,
    "node.eventloop.delay.ms.p99": 100,
    "node.eventloop.delay.ms.max": 100
  }
}
```