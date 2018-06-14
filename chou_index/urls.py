from django.urls import include, path
from . import views

urlpatterns = [
    # 進入首頁的意思(因為直接接domain)
    path("", views.index, name='index'),
    #path("",views.這裡呼叫def的名稱,nmae="該名稱")
]