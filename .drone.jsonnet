local pipeline(version) = {
    kind: "pipeline",
    name: "node-v" + version,
    steps: [
        {
            name: "tests",
            image: "node:" + version,
            commands: [
                "node -v",
                "yarn -v",
                "uname -r",
                "yarn install --ignore-engines",
                "yarn test",
            ],
            environment: {
              NODE_ENV: "test",
            },
        },
    ],
    trigger: {
      event: "push"
    },
};

[
    pipeline("4"),
    pipeline("6"),
    pipeline("8"),
    pipeline("10"),
    pipeline("11"),
    {
        kind: "pipeline",
        name: "build & publish",
        trigger: {
          event: "tag"
        },
        steps: [
          {
            name: "build",
            image: "node:10",
            commands: [
              "yarn",
              "npx prebuild --all -t  -u $GITHUB_TOKEN",
            ],
            environment: {
              GITHUB_TOKEN: {
                from_secret: "github_token"
              },
            },
          },
          {
            name: "publish",
            image: "plugins/npm",
            settings: {
              username: {
                from_secret: "npm_username"
              },
              password: {
                from_secret: "npm_password"
              },
              email: {
                from_secret: "npm_email"
              },
            },
          },
        ],
    },
    {
        kind: "secret",
        name: "npm_username",
        get: {
          path: "secret/drone/npm",
          name: "username",
        },
    },
    {
        kind: "secret",
        name: "npm_email",
        get: {
          path: "secret/drone/npm",
          name: "email",
        },
    },
    {
        kind: "secret",
        name: "npm_password",
        get: {
          path: "secret/drone/npm",
          name: "password",
        },
    },
    {
        kind: "secret",
        name: "github_token",
        get: {
          path: "secret/drone/github",
          name: "token",
        },
    },
]