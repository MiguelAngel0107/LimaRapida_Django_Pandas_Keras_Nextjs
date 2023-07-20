# Generated by Django 4.1.9 on 2023-07-12 15:01

import apps.perfil.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="UserProfile",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "picture",
                    models.ImageField(
                        default="users/user_default_profile.jpg",
                        upload_to=apps.perfil.models.user_directory_path_profile,
                    ),
                ),
                (
                    "banner",
                    models.ImageField(
                        default="users/user_default_bg.jpg",
                        upload_to=apps.perfil.models.user_directory_path_banner,
                    ),
                ),
                (
                    "verified",
                    models.CharField(
                        choices=[
                            ("unverified", "unverified"),
                            ("verified", "verified"),
                        ],
                        default="unverified",
                        max_length=10,
                    ),
                ),
                (
                    "coins",
                    models.DecimalField(decimal_places=2, default=0, max_digits=19),
                ),
                ("date_created", models.DateField(auto_now_add=True)),
                ("address_line_1", models.CharField(default="", max_length=255)),
                ("address_line_2", models.CharField(default="", max_length=255)),
                ("city", models.CharField(default="", max_length=255)),
                ("state_province_region", models.CharField(default="", max_length=255)),
                ("zipcode", models.CharField(default="", max_length=20)),
                ("phone", models.CharField(default="", max_length=255)),
                (
                    "country_region",
                    models.CharField(
                        choices=[
                            ("Afghanistan", "Afghanistan"),
                            ("Åland Islands", "Åland Islands"),
                            ("Albania", "Albania"),
                            ("Algeria", "Algeria"),
                            ("American Samoa", "American Samoa"),
                            ("Andorra", "Andorra"),
                            ("Angola", "Angola"),
                            ("Anguilla", "Anguilla"),
                            ("Antarctica", "Antarctica"),
                            ("Antigua and Barbuda", "Antigua And Barbuda"),
                            ("Argentina", "Argentina"),
                            ("Armenia", "Armenia"),
                            ("Aruba", "Aruba"),
                            ("Australia", "Australia"),
                            ("Austria", "Austria"),
                            ("Azerbaijan", "Azerbaijan"),
                            ("Bahamas", "Bahamas"),
                            ("Bahrain", "Bahrain"),
                            ("Bangladesh", "Bangladesh"),
                            ("Barbados", "Barbados"),
                            ("Belarus", "Belarus"),
                            ("Belgium", "Belgium"),
                            ("Belize", "Belize"),
                            ("Benin", "Benin"),
                            ("Bermuda", "Bermuda"),
                            ("Bhutan", "Bhutan"),
                            ("Bolivia (Plurinational State of)", "Bolivia"),
                            ("Bonaire, Sint Eustatius and Saba", "Bonaire"),
                            ("Bosnia and Herzegovina", "Bosnia And Herzegovina"),
                            ("Botswana", "Botswana"),
                            ("Bouvet Island", "Bouvet Island"),
                            ("Brazil", "Brazil"),
                            (
                                "British Indian Ocean Territory",
                                "British Indian Ocean Territory",
                            ),
                            ("Brunei Darussalam", "Brunei Darussalam"),
                            ("Bulgaria", "Bulgaria"),
                            ("Burkina Faso", "Burkina Faso"),
                            ("Burundi", "Burundi"),
                            ("Cabo Verde", "Cabo Verde"),
                            ("Cambodia", "Cambodia"),
                            ("Cameroon", "Cameroon"),
                            ("Canada", "Canada"),
                            ("Cayman Islands", "Cayman Islands"),
                            ("Central African Republic", "Central African Republic"),
                            ("Chad", "Chad"),
                            ("Chile", "Chile"),
                            ("China", "China"),
                            ("Christmas Island", "Christmas Island"),
                            ("Cocos (Keeling) Islands", "Cocos Islands"),
                            ("Colombia", "Colombia"),
                            ("Comoros", "Comoros"),
                            ("Congo", "Congo"),
                            (
                                "Democratic Republic of the Congo",
                                "Democratic Republic Of The Congo",
                            ),
                            ("Cook Islands", "Cook Islands"),
                            ("Costa Rica", "Costa Rica"),
                            ("Côte d'Ivoire", "Côte Divoire"),
                            ("Croatia", "Croatia"),
                            ("Cuba", "Cuba"),
                            ("Curaçao", "Curaçao"),
                            ("Cyprus", "Cyprus"),
                            ("Czechia", "Czechia"),
                            ("Denmark", "Denmark"),
                            ("Djibouti", "Djibouti"),
                            ("Dominica", "Dominica"),
                            ("Dominican Republic", "Dominican Republic"),
                            ("Ecuador", "Ecuador"),
                            ("Egypt", "Egypt"),
                            ("El Salvador", "El Salvador"),
                            ("Equatorial Guinea", "Equatorial Guinea"),
                            ("Eritrea", "Eritrea"),
                            ("Estonia", "Estonia"),
                            ("Eswatini", "Eswatini"),
                            ("Ethiopia", "Ethiopia"),
                            ("Falkland Islands (Malvinas)", "Falkland Islands"),
                            ("Faroe Islands", "Faroe Islands"),
                            ("Fiji", "Fiji"),
                            ("Finland", "Finland"),
                            ("France", "France"),
                            ("French Guiana", "French Guiana"),
                            ("French Polynesia", "French Polynesia"),
                            (
                                "French Southern Territories",
                                "French Southern Territories",
                            ),
                            ("Gabon", "Gabon"),
                            ("Gambia", "Gambia"),
                            ("Georgia", "Georgia"),
                            ("Germany", "Germany"),
                            ("Ghana", "Ghana"),
                            ("Gibraltar", "Gibraltar"),
                            ("Greece", "Greece"),
                            ("Greenland", "Greenland"),
                            ("Grenada", "Grenada"),
                            ("Guadeloupe", "Guadeloupe"),
                            ("Guam", "Guam"),
                            ("Guatemala", "Guatemala"),
                            ("Guernsey", "Guernsey"),
                            ("Guinea", "Guinea"),
                            ("Guinea-Bissau", "Guinea Bissau"),
                            ("Guyana", "Guyana"),
                            ("Haiti", "Haiti"),
                            (
                                "Heard Island and McDonald Islands",
                                "Heard Island And Mcdonald Islands",
                            ),
                            ("Holy See", "Holy See"),
                            ("Honduras", "Honduras"),
                            ("Hong Kong", "Hong Kong"),
                            ("Hungary", "Hungary"),
                            ("Iceland", "Iceland"),
                            ("India", "India"),
                            ("Indonesia", "Indonesia"),
                            ("Iran (Islamic Republic of)", "Iran"),
                            ("Iraq", "Iraq"),
                            ("Ireland", "Ireland"),
                            ("Isle of Man", "Isle Of Man"),
                            ("Israel", "Israel"),
                            ("Italy", "Italy"),
                            ("Jamaica", "Jamaica"),
                            ("Japan", "Japan"),
                            ("Jersey", "Jersey"),
                            ("Jordan", "Jordan"),
                            ("Kazakhstan", "Kazakhstan"),
                            ("Kenya", "Kenya"),
                            ("Kiribati", "Kiribati"),
                            (
                                "Korea (the Democratic People's Republic of)",
                                "Democratic Peoples Republic Of Korea",
                            ),
                            ("Korea (the Republic of)", "Republic Of Korea"),
                            ("Kuwait", "Kuwait"),
                            ("Kyrgyzstan", "Kyrgyzstan"),
                            (
                                "Lao People's Democratic Republic",
                                "Lao Peoples Democratic Republic",
                            ),
                            ("Latvia", "Latvia"),
                            ("Lebanon", "Lebanon"),
                            ("Lesotho", "Lesotho"),
                            ("Liberia", "Liberia"),
                            ("Libya", "Libya"),
                            ("Liechtenstein", "Liechtenstein"),
                            ("Lithuania", "Lithuania"),
                            ("Luxembourg", "Luxembourg"),
                            ("Macao", "Macao"),
                            ("Madagascar", "Madagascar"),
                            ("Malawi", "Malawi"),
                            ("Malaysia", "Malaysiamy"),
                            ("Maldives", "Maldives"),
                            ("Mali", "Mali"),
                            ("Malta", "Malta"),
                            ("Marshall Islands", "Marshall Islands"),
                            ("Martinique", "Martinique"),
                            ("Mauritania", "Mauritania"),
                            ("Mauritius", "Mauritius"),
                            ("Mayotte", "Mayotte"),
                            ("Mexico", "Mexico"),
                            ("Micronesia (Federated States of)", "Micronesia"),
                            ("Moldova (the Republic of)", "Moldova"),
                            ("Monaco", "Monaco"),
                            ("Mongolia", "Mongolia"),
                            ("Montenegro", "Montenegro"),
                            ("Montserrat", "Montserrat"),
                            ("Morocco", "Morocco"),
                            ("Mozambique", "Mozambique"),
                            ("Myanmar", "Myanmar"),
                            ("Namibia", "Namibia"),
                            ("Nauru", "Nauru"),
                            ("Nepal", "Nepal"),
                            ("Netherlands", "Netherlands"),
                            ("New Caledonia", "New Caledonia"),
                            ("New Zealand", "New Zealand"),
                            ("Nicaragua", "Nicaragua"),
                            ("Niger", "Niger"),
                            ("Nigeria", "Nigeria"),
                            ("Niue", "Niue"),
                            ("Norfolk Island", "Norfolk Island"),
                            ("North Macedonia", "North Macedonia"),
                            ("Northern Mariana Islands", "Northern Mariana Islands"),
                            ("Norway", "Norway"),
                            ("Oman", "Oman"),
                            ("Pakistan", "Pakistan"),
                            ("Palau", "Palau"),
                            ("Palestine, State of", "Palestine"),
                            ("Panama", "Panama"),
                            ("Papua New Guinea", "Papua New Guinea"),
                            ("Paraguay", "Paraguay"),
                            ("Peru", "Peru"),
                            ("Philippines", "Philippines"),
                            ("Pitcairn", "Pitcairn"),
                            ("Poland", "Poland"),
                            ("Portugal", "Portugal"),
                            ("Puerto Rico", "Puerto Rico"),
                            ("Qatar", "Qatar"),
                            ("Réunion", "Réunion"),
                            ("Romania", "Romania"),
                            ("Russian Federation", "Russian Federation"),
                            ("Rwanda", "Rwanda"),
                            ("Saint Barthélemy", "Saint Barthélemy"),
                            (
                                "Saint Helena, Ascension and Tristan da Cunha",
                                "Saint Helena",
                            ),
                            ("Saint Kitts and Nevis", "Saint Kitts And Nevis"),
                            ("Saint Lucia", "Saint Lucia"),
                            ("Saint Martin (French part)", "Saint Martin"),
                            ("Saint Pierre and Miquelon", "Saint Pierre And Miquelon"),
                            (
                                "Saint Vincent and the Grenadines",
                                "Saint Vincent And The Grenadines",
                            ),
                            ("Samoa", "Samoa"),
                            ("San Marino", "San Marino"),
                            ("Sao Tome and Principe", "Sao Tome And Principe"),
                            ("Saudi Arabia", "Saudi Arabia"),
                            ("Senegal", "Senegal"),
                            ("Serbia", "Serbia"),
                            ("Seychelles", "Seychelles"),
                            ("Sierra Leone", "Sierra Leone"),
                            ("Singapore", "Singapore"),
                            ("Sint Maarten (Dutch part)", "Sint Maarten"),
                            ("Slovakia", "Slovakia"),
                            ("Slovenia", "Slovenia"),
                            ("Solomon Islands", "Solomon Islands"),
                            ("Somalia", "Somalia"),
                            ("South Africa", "South Africa"),
                            (
                                "South Georgia and the South Sandwich Islands",
                                "South Georgia And The South Sandwich Islands",
                            ),
                            ("South Sudan", "South Sudan"),
                            ("Spain", "Spain"),
                            ("Sri Lanka", "Sri Lanka"),
                            ("Sudan", "Sudan"),
                            ("Suriname", "Suriname"),
                            ("Svalbard and Jan Mayen", "Svalbard And Jan Mayen"),
                            ("Sweden", "Sweden"),
                            ("Switzerland", "Switzerland"),
                            ("Syrian Arab Republic", "Syrian Arab Republic"),
                            ("Taiwan (Province of China)", "Taiwan"),
                            ("Tajikistan", "Tajikistan"),
                            ("Tanzania, the United Republic of", "Tanzania"),
                            ("Thailand", "Thailand"),
                            ("Timor-Leste", "Timor Leste"),
                            ("Togo", "Togo"),
                            ("Tokelau", "Tokelau"),
                            ("Tonga", "Tonga"),
                            ("Trinidad and Tobago", "Trinidad And Tobago"),
                            ("Tunisia", "Tunisia"),
                            ("Turkey", "Turkey"),
                            ("Turkmenistan", "Turkmenistan"),
                            ("Turks and Caicos Islands", "Turks And Caicos Islands"),
                            ("Tuvalu", "Tuvalu"),
                            ("Uganda", "Uganda"),
                            ("Ukraine", "Ukraine"),
                            ("United Arab Emirates", "United Arab Emirates"),
                            (
                                "United Kingdom of Great Britain and Northern Ireland",
                                "United Kingdom Of Great Britain And Northern Ireland",
                            ),
                            (
                                "United States Minor Outlying Islands",
                                "United States Minor Outlying Islands",
                            ),
                            ("United States of America", "United States Of America"),
                            ("Uruguay", "Uruguay"),
                            ("Uzbekistan", "Uzbekistan"),
                            ("Vanuatu", "Vanuatu"),
                            ("Venezuela (Bolivarian Republic of)", "Venezuela"),
                            ("Viet Nam", "Viet Nam"),
                            ("Virgin Islands (British)", "British Virgin Islands"),
                            ("Virgin Islands (U.S.)", "Us Virgin Islands"),
                            ("Wallis and Futuna", "Wallis And Futuna"),
                            ("Western Sahara", "Western Sahara"),
                            ("Yemen", "Yemen"),
                            ("Zambia", "Zambia"),
                            ("Zimbabwe", "Zimbabwe"),
                        ],
                        default="Peru",
                        max_length=255,
                    ),
                ),
                ("location", models.CharField(blank=True, max_length=50, null=True)),
                ("url", models.CharField(blank=True, max_length=80, null=True)),
                ("birthday", models.DateField(blank=True, null=True)),
                ("bio", models.TextField(blank=True, max_length=150, null=True)),
            ],
        ),
    ]
