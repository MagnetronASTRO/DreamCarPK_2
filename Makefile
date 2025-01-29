.PHONY: up down restart logs web-api redis

# Start all services
up:
	docker compose up -d --build

# Stop all services
down:
	docker compose down

# Restart all services
restart:
	docker compose down && docker compose up -d --build

# View logs
logs:
	docker compose logs -f

# Run web in development mode
web-dev:
	docker compose run --rm web npm run dev

# Run API migrations and setup
api-setup:
	docker compose exec api php artisan migrate --seed

# View Swagger UI
swagger:
	echo "Swagger UI available at: http://localhost:8888"

# Run Redis CLI
redis:
	docker compose exec redis redis-cli
