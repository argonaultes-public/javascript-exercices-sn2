class Vaisseau {
    constructor(nom, couleur, vitesse, latence) {
        this.nom = nom;
        this.vitesse = vitesse;
        this.couleur = couleur;
        this.latence = latence;
    }

    compareVaisseau(other) {
        return this.nom == other.nom;
    }
}


class Circuit {
    constructor(nb_tours, distance_tour) {
        this.nb_tours = nb_tours;
        this.distance_tour = distance_tour;
        this.vaisseaux = new Set();
        this.vaisseauxMap = new Map();
        this.vaisseauxList = [];
    }

    subscribe(vaisseau) {
        this.subscribeList(vaisseau);
    }

    //Set usage
    subscribeSet(vaisseau) {
        this.vaisseaux.add(JSON.stringify(vaisseau));
    }

    //Map usage
    subscribeMap(vaisseau) {
        this.vaisseauxMap.set(vaisseau.nom, vaisseau);
    }

    subscribeList(vaisseau) {
        //tester si le vaisseau est dans la liste
        if (!this.vaisseauxList.find((element) => vaisseau.compareVaisseau(element))) {
            this.vaisseauxList.push(vaisseau);
        }
        //si oui, ne rien faire
        //sinon, ajouter le vaisseau à la liste
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

