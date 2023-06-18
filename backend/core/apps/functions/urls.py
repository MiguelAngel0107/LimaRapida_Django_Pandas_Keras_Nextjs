from django.urls import path
from .views import LongitudSecanteView

urlpatterns = [
    path('calculate-secante/', LongitudSecanteView.as_view())
]
