class Vaisseau {
    constructor(nom, couleur, vitesse, latence) {
        this.nom = nom;
        this.vitesse = vitesse;
        this.couleur = couleur;
        this.latence = latence;
    }
}

class Circuit {
    constructor(nb_tours, distance_tour) {
        this.nb_tours = nb_tours;
        this.distance_tour = distance_tour;
        this.vaisseaux = [];
    }

    subscribe(vaisseau) {
        this.vaisseaux.push(vaisseau);
    }
}

const vs = [
    new Vaisseau('v1', 'r', 100, 1),
    new Vaisseau('v2', 'v', 120, 2)
];

const melbourne = new Circuit(5, 1300);
melbourne.subscribe(vs[0]);
melbourne.subscribe(vs[1]);
melbourne.subscribe(vs[0]);

console.log(melbourne);
