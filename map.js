import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const WineCellarMap = () => {
  const [selectedCellar, setSelectedCellar] = useState(null);

  // Données des caves à vins de Bordeaux
  const wineCellars = [
    {
      id: 1,
      name: "La Cité du Vin",
      address: "134 Quai de la Garonne, 33300 Bordeaux",
      description: "Musée et centre d'interprétation entièrement dédié au vin",
      specialty: "Musée et centre culturel viticole",
      coordinates: {
        latitude: 44.8641,
        longitude: -0.5593
      }
    },
    {
      id: 2,
      name: "Aux Quatre Coins du Vin",
      address: "24 Rue du Parlement Saint-Pierre, 33000 Bordeaux",
      description: "Cave à dégustation proposant une sélection de vins locaux et internationaux",
      specialty: "Dégustation et vente de vins",
      coordinates: {
        latitude: 44.8406,
        longitude: -0.5736
      }
    },
    {
      id: 3,
      name: "L'Intendant Cave à Vins",
      address: "2 Allées de Tourny, 33000 Bordeaux",
      description: "Cave historique au cœur de Bordeaux, spécialisée dans les grands crus",
      specialty: "Grands crus bordelais",
      coordinates: {
        latitude: 44.8415,
        longitude: -0.5747
      }
    },
    {
      id: 4,
      name: "Bar à Vins du CIVB",
      address: "Cours du XXX Juillet, 33000 Bordeaux",
      description: "Bar à vins officiel du Conseil Interprofessionnel du Vin de Bordeaux",
      specialty: "Vins de Bordeaux officiels",
      coordinates: {
        latitude: 44.8440,
        longitude: -0.5713
      }
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
        Caves à Vins de Bordeaux
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {wineCellars.map((cellar) => (
            <Card 
              key={cellar.id}
              className={`cursor-pointer transition-all duration-300 ${
                selectedCellar?.id === cellar.id 
                  ? 'border-blue-500 shadow-lg' 
                  : 'hover:border-blue-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedCellar(cellar)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{cellar.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{cellar.address}</p>
                <p className="mt-2 text-sm">{cellar.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm font-semibold text-blue-700">
                    {cellar.specialty}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          {selectedCellar ? (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-blue-800">
                {selectedCellar.name}
              </h2>
              <div className="space-y-3">
                <p><strong>Adresse :</strong> {selectedCellar.address}</p>
                <p><strong>Description :</strong> {selectedCellar.description}</p>
                <p><strong>Spécialité :</strong> {selectedCellar.specialty}</p>
                <div className="mt-4">
                  <strong>Coordonnées :</strong>
                  <p>Latitude : {selectedCellar.coordinates.latitude}</p>
                  <p>Longitude : {selectedCellar.coordinates.longitude}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Sélectionnez une cave à vins pour afficher plus de détails
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WineCellarMap;