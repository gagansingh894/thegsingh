.PHONY: deploy

deploy:
	cd /root/thegsingh && \
	git pull && \
	docker build -f build/Dockerfile.backend -t tgs-backend . && \
	docker stop $$(docker ps -q) && \
	docker run -d -p 8080:8080 --restart always tgs-backend