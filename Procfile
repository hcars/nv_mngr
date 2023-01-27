release: python manage.py migrate
web: gunicorn backend.wsgi:application --log-file -
web: npm run postinstall