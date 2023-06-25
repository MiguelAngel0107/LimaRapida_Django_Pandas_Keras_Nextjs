def convertir_a_formato_url(coordenadas):
    coordenadas_lista = coordenadas.split("|")
    coordenadas_url = []

    for coordenada in coordenadas_lista:
        latitud, longitud = coordenada.split(",")
        coordenada_url = f"{latitud}%2C{longitud}"
        coordenadas_url.append(coordenada_url)

    coordenadas_url_formato_url = "%7C".join(coordenadas_url)
    return coordenadas_url_formato_url

# Ejemplo de uso:
coordenadas_originales = "-12.047202,-76.999853|-12.048535,-77.000872|-12.050766,-77.002489"
coordenadas_formato_url = convertir_a_formato_url(coordenadas_originales)
print(coordenadas_formato_url)