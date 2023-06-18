import math


def calcularLongitudSecante(angulo, radio):
    # Convertir el ángulo de grados a radianes
    anguloRadianes = math.radians(angulo)

    # Calcular la longitud de la secante
    longitudSecante = (2 * radio) / math.cos(anguloRadianes)

    return longitudSecante


# Ejemplo de uso
angulo = -45
radio = 125

longitudSecante = calcularLongitudSecante(angulo, radio)
print("La longitud de la secante es:", longitudSecante)
