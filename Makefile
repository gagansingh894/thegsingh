#deploy:
#	cd /root/thegsingh && \
#	git pull && \
#	docker build -f build/Dockerfile.backend -t tgs-backend . && \
#	docker stop $$(docker ps -q) && \
#	docker run -d -p 8080:8080 --restart always \
#		-e RESEND_API_KEY=$$RESEND_API_KEY \
#		tgs-backend

.PHONY: deploy restart

deploy:
	docker compose up -d --build

restart:
	cd /root/thegsingh && \
	docker compose restart