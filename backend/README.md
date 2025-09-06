# Civic Portal Backend

This is a Django project with Django Rest Framework and django-cors-headers installed.

## Apps
- users
- issues

## API
- Configured with Django Rest Framework (`rest_framework`)

## CORS
- Configured with `django-cors-headers` for React integration (CORS_ALLOW_ALL_ORIGINS=True for development)

## Setup
1. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
2. Run migrations:
   ```sh
   python manage.py migrate
   ```
3. Start the server:
   ```sh
   python manage.py runserver
   ```

---
Replace CORS_ALLOW_ALL_ORIGINS with specific origins in production.
