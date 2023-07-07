python -m venv venv         # Crea el entorno virtual
source venv/bin/activate
#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input

python manage.py migrate