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
    }

    //Set usage
    subscribe(vaisseau) {
        this.vaisseaux.add(JSON.stringify(vaisseau));
        // pour repasser dans l'autre sens JSON.parse
    }

}

const vs = [
    new Vaisseau('v1', 'r', 100, 1),
    new Vaisseau('v2', 'v', 120, 2)
];

const melbourne = new Circuit(5, 1300);
melbourne.subscribe(vs[0]);
melbourne.subscribe(vs[0]);
melbourne.subscribe(vs[1]);
melbourne.subscribe(new Vaisseau(vs[0].nom, vs[0].couleur, vs[0].vitesse, vs[0].latence));

console.log(melbourne);

const vstr = melbourne.vaisseaux.values().next().value;
console.log(vstr);
console.log(typeof(vstr));
const vobj = JSON.parse(vstr);
console.log(typeof(vobj));
console.log(vobj);
console.log(vobj.nom);
