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
        this.vaisseaux = new Set();
        this.vaisseauxMap = new Map();
    }

    //Set usage
    subscribe(vaisseau) {
        this.vaisseaux.add(JSON.stringify(vaisseau));
        // pour repasser dans l'autre sens JSON.parse
    }

    //Map usage
    subscribeMap(vaisseau) {
        this.vaisseauxMap.set(vaisseau.nom, vaisseau);
    }

}

const vs = [
    new Vaisseau('v1', 'r', 100, 1),
    new Vaisseau('v2', 'v', 120, 2)
];

const melbourne = new Circuit(5, 1300);
melbourne.subscribeMap(vs[0]);
melbourne.subscribeMap(vs[0]);
melbourne.subscribeMap(vs[1]);
melbourne.subscribeMap(new Vaisseau(vs[0].nom, vs[0].couleur, vs[0].vitesse, vs[0].latence));

console.log(melbourne);

