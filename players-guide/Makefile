default:
	mdbook serve --open

deploy:
	mdbook build
	echo "Bucket Upload Activating..."
	aws s3 sync ./book s3://rt0 --endpoint-url=https://s3.us-west-1.wasabisys.com --profile rt0
	echo "Bucket Upload Complete!"