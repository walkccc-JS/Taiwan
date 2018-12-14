run:
	npm run build
	rsync -r build/ dist
	firebase deploy