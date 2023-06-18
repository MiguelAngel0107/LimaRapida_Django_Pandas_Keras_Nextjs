import numpy as np
import matplotlib.pyplot as plt

def interpolate_segment(p_start, p_end, num_divisions, elevation_point, elevation_amount):
    # Puntos de control para la interpolación cúbica de Hermite
    m_start = np.array([5, 5])
    m_end = np.array([5, 5])

    # División en segmentos
    t = np.linspace(0, 1, num_divisions + 1)

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
    segments = hermite_interpolation(p_start, p_end, m_start, m_end, t)

    # Aplicar elevación en el punto deseado
    segments[int(num_divisions * elevation_point)] += np.array([0, elevation_amount])

    # Imprimir las coordenadas de los segmentos
    for segment in segments:
        print(segment)

    # Plot
    plt.plot(segments[:, 0], segments[:, 1], '-o')
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.title('Segmentos divididos')
    plt.grid(True)
    plt.show()

# Ejemplo de uso
p_start = np.array([0, 0])
p_end = np.array([10, 0])
num_divisions = 20
elevation_point = 0.5
elevation_amount = 5

interpolate_segment(p_start, p_end, num_divisions, elevation_point, elevation_amount)
