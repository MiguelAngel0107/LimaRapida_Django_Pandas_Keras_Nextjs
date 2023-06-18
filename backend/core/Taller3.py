import numpy as np
import matplotlib.pyplot as plt

def generar_curva(punto_inicial, punto_final, n, altura_maxima):
    x = np.linspace(punto_inicial[0], punto_final[0], n+1)
    y = np.zeros(n+1)

    # Calcular el punto máximo de la curva
    punto_maximo = (punto_inicial[0] + (punto_final[0] - punto_inicial[0]) / 2, altura_maxima)
    punto_maximo_index = n // 2

    # Generar curva ascendente
    for i in range(punto_maximo_index + 1):
        t = i / punto_maximo_index
        y[i] = punto_inicial[1] + t * (punto_maximo[1] - punto_inicial[1])

    # Generar curva descendente
    for i in range(punto_maximo_index + 1, n+1):
        t = (i - punto_maximo_index) / (n - punto_maximo_index)
        y[i] = punto_maximo[1] + t * (punto_final[1] - punto_maximo[1])

    return x, y

# Puntos de inicio y final
punto_inicial = (0, 0)
punto_final = (10, 0)

# Generar curva con 10 segmentos y una altura máxima de 3
n_segmentos = 10
altura_maxima = 3
curva_x, curva_y = generar_curva(punto_inicial, punto_final, n_segmentos, altura_maxima)

# Graficar curva
plt.plot(curva_x, curva_y, 'b-')
plt.plot([punto_inicial[0], punto_final[0]], [punto_inicial[1], punto_final[1]], 'ro')
plt.scatter(curva_x, curva_y, color='black', marker='o')

plt.xlabel('X')
plt.ylabel('Y')
plt.title('Curva generada con altura máxima')
plt.grid(True)
plt.show()
