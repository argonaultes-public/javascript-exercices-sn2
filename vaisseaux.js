class Vaisseau {
    constructor(nom, couleur, vitesse, latence) {
        this.nom = nom;
        this.vitesse = vitesse; // m/s
        this.couleur = couleur;
        this.latence = latence; // s
        this.tempsParcours = null;
        this.distance_parcourue = 0;
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
        this.temps_passe = 0;
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

    vainqueur() {
        const distance_total = (this.nb_tours * this.distance_tour);
        let vainqueur = this.vaisseauxList[0];
        vainqueur.tempsParcours = distance_total / vainqueur.vitesse + vainqueur.latence;

        //OPTION 1
        //parcourir la liste de vaisseaux
        //conserver à chaque fois le vaisseau ayant le plus petit temps
        for (const vaisseau of this.vaisseauxList) {
            vaisseau.tempsParcours = distance_total / vaisseau.vitesse + vaisseau.latence;
            if (vaisseau.tempsParcours < vainqueur.tempsParcours) {
                vainqueur = vaisseau;
            }           
        }
        return vainqueur;

        //calculer tous les temps de parcours
        //chercher la valeur min parmi tous les temps de parcours
    }

    vainqueurV2() {
        //OPTION 2
        const distance_total = (this.nb_tours * this.distance_tour);
        for (const vaisseau of this.vaisseauxList) {
            vaisseau.tempsParcours = distance_total / vaisseau.vitesse + vaisseau.latence;
        }
        this.vaisseauxList.sort((v1, v2) => v1.tempsParcours - v2.tempsParcours);
        return this.vaisseauxList[0];
    }

    calculer_distance_parcourue() {
        for (const vaisseau of this.vaisseauxList) {
            this.calculer_distance(vaisseau);
        }
    }

    calculer_distance(vaisseau) {
        vaisseau.distance_parcourue = Math.max(this.temps_passe - vaisseau.latence, 0) * vaisseau.vitesse;
    }

    avance_prochaine_seconde() {
        this.temps_passe++;
    }

}

const vs = [
    new Vaisseau('v1', 'r', 100, 10),
    new Vaisseau('v2', 'v', 120, 2),
    new Vaisseau('v3', 'v', 120, 4),
    new Vaisseau('v4', 'v', 100, 1)
];

const melbourne = new Circuit(5, 1300);
melbourne.subscribe(vs[0]);
melbourne.subscribe(vs[1]);
melbourne.subscribe(vs[2]);
melbourne.subscribe(vs[3]);
melbourne.subscribe(new Vaisseau(vs[0].nom, vs[0].couleur, vs[0].vitesse, vs[0].latence));

// console.log(`Vainqueur: ${JSON.stringify(melbourne.vainqueurV2())}`);

console.log(melbourne);
melbourne.avance_prochaine_seconde();
melbourne.avance_prochaine_seconde();
melbourne.avance_prochaine_seconde();
melbourne.avance_prochaine_seconde();
melbourne.calculer_distance_parcourue();
console.log(melbourne);