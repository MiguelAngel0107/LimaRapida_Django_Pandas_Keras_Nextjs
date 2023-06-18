import numpy as np
import matplotlib.pyplot as plt

# Segmento original

p0 = np.array([0, 0])
p1 = np.array([10, 0])

# Punto medio elevado
pm = np.array([5, 5])

# División en 20 partes
num_segments = 20
t = np.linspace(0, 1, num_segments + 1)

# Interpolación cúbica de Hermite


def hermite_interpolation(p0, p1, m0, m1, t):
    t2 = t * t
    t3 = t2 * t
    h00 = 2 * t3 - 3 * t2 + 1
    h10 = t3 - 2 * t2 + t
    h01 = -2 * t3 + 3 * t2
    h11 = t3 - t2
    return h00[:, np.newaxis] * p0 + h10[:, np.newaxis] * (p1 - p0) + h01[:, np.newaxis] * m0 + h11[:, np.newaxis] * m1


# Calcular las coordenadas de los segmentos
segments = hermite_interpolation(p0, p1, pm, pm, t)


# Plot
plt.plot(segments[:, 0], segments[:, 1], '-o')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Segmentos divididos')
plt.grid(True)
plt.show()

objects = []
for segment in segments:
    x, y = segment
    obj = {'x': x, 'y': y}
    objects.append(obj)

# Imprimir la lista de objetos en la consola
for obj in objects:
    print(obj)
