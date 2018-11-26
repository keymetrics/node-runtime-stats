{
	"targets": [
		{
			"target_name": "node-runtime-stats",
			"sources": [
				"lib/nativeStats.cc"
			],
			"include_dirs": [
				"<!(node -e \"require('nan')\")"
			],
		}
	]
}
