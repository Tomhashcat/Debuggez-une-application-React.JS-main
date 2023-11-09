import React, { useEffect, useState } from "react";
import Menu from "../../containers/Menu";
import ServiceCard from "../../components/ServiceCard";
import EventCard from "../../components/EventCard";
import PeopleCard from "../../components/PeopleCard";

import "./style.scss";
import EventList from "../../containers/Events";
import Slider from "../../containers/Slider";
import Logo from "../../components/Logo";
import Icon from "../../components/Icon";
import Form from "../../containers/Form";
import Modal from "../../containers/Modal";
import { useData } from "../../contexts/DataContext";


const Page = () => {
  const { data } = useData();
  const [last, setLast] = useState(null);
  const onModalClose = () => {
    // Code pour réinitialiser la modal
  };
  useEffect(() => {
    if (data) {
      // Triez les événements par date 
      const sortedEvents = data.events.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Sélectionnez le premier événement de la liste triée (le plus récent).
      if (sortedEvents.length > 0) {
        setLast(sortedEvents[0]);
      }
    }
  }, [data]);
  return <>
    <header>
      <Menu />
    </header>
    <main>
      <section className="SliderContainer">
        <Slider />
      </section>
      <section className="ServicesContainer">
        <h2 id="nos-services" className="Title">Nos services</h2>
        <p>Nous organisons des événements sur mesure partout dans le monde</p>
        <div className="ListContainer">
          <ServiceCard imageSrc="/images/priscilla-du-preez-Q7wGvnbuwj0-unsplash1.png">
            <h3>Soirée d’entreprise</h3>
            Une soirée d’entreprise vous permet de réunir vos équipes pour un
            moment convivial afin de valoriser votre société en projetant une
            image dynamique. Nous vous proposons d’organiser pour vous vos
            diners et soirée d’entreprise
          </ServiceCard>
          <ServiceCard imageSrc="/images/hall-expo.png">
            <h3>Conférences</h3>
            77 events vous propose d’organiser votre évènement, quelle que soit
            sa taille, en s’adaptant à votre demande et à vos demandes. En tant
            que spécialistes de l’évènementiel, nous saurons trouver le lieu
            parfait ainsi que des solutions inédites pour capter votre audience
            et faire de cet évènement un succès
          </ServiceCard>
          <ServiceCard imageSrc="/images/sophia-sideri-LFXMtUuAKK8-unsplash1.png">
            <h3>Experience digitale</h3>
            Notre agence experte en contenus immersifs offre des services de
            conseil aux entreprises, pour l’utilisation de la réalité virtuelle,
            de la réalité augmentée et de la réalité mixte de l’animation
            événementielle, à la veille technologique jusqu’au développement de
            module de formation innovant
          </ServiceCard>
        </div>
      </section>
      <section className="EventsContainer">
        <h2 id="nos-realisations" className="Title">Nos réalisations</h2>
        <EventList />
      </section>
      <section className="PeoplesContainer">
        <h2 id="notre-equipe" className="Title">Notre équipe</h2>
        <p>Une équipe d’experts dédiés à l’ogranisation de vos événements</p>
        <div className="ListContainer">
          <PeopleCard
            imageSrc="/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png"
            name="Samira"
            position="CEO"
          />
          <PeopleCard
            imageSrc="/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png"
            name="Jean-baptiste"
            position="Directeur marketing"
          />
          <PeopleCard
            imageSrc="/images/christina-wocintechchat-com-SJvDxw0azqw-unsplash.png"
            name="Alice"
            position="CXO"
          />
          <PeopleCard
            imageSrc="/images/jonas-kakaroto-KIPqvvTOC1s-unsplash.png"
            name="Luís"
            position="Animateur"
          />
          <PeopleCard
            imageSrc="/images/amy-hirschi-b3AYk8HKCl0-unsplash1.png"
            name="Christine"
            position="VP animation"
          />
          <PeopleCard
            imageSrc="/images/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.png"
            name="Isabelle"
            position="VP communication"
          />
        </div>
      </section>
      <div className="FormContainer" id="contact">
        <h2 id="contact" className="Title">Contact</h2>
        <Modal className="SuccessModal"
        
          Content={
            <div className="ModalMessage--success">
              <div>Message envoyé !</div>
              <p>
                Merci pour votre message nous tâcherons de vous répondre dans
                les plus brefs délais
              </p>
            </div>

          }
        >
          {({ setIsOpened }) => (
            <Form
              onSuccess={() =>{ setIsOpened(true);
                  onModalClose();}}
          onError={() => null}
            />
          )}
        </Modal>




      </div>
    </main>
    {last && (
      <footer className="row">
        <div className="col presta">
          <h3>Notre derniére prestation</h3>

          <EventCard
            imageSrc={last?.cover}
            title={last?.title}
            date={new Date(last?.date)}
            small
            label="boom"
          />

        </div>
        <div className="col contact">
          <h3>Contactez-nous</h3>
          <a href="https://www.google.com/maps/place/45+Av.+de+la+R%C3%A9publique,+75011+Paris/@48.8651409,2.3760562,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66dfb281b0c9d:0x2fe3bed19373a7ed!8m2!3d48.8651409!4d2.3760562!16s%2Fg%2F11csdk6ftv?entry=ttu"><address>45 avenue de la République, 75000 Paris</address></a>
          <div>01 23 45 67 89</div>
          <a href="mailto:contact@77events.com">contact@77events.com</a>
          <div>
            <a href="https://www.twitch.tv/">
              <Icon name="twitch" />
            </a>
            <a href="https://fr-fr.facebook.com">
              <Icon name="facebook" />
            </a>
            <a href="https://twitter.com/x">
              <Icon name="twitter" />
            </a>
            <a href="https://www.youtube.com/">
              <Icon name="youtube" />
            </a>
          </div>
        </div>
        <div className="col description">
          <Logo size="large" />
          <p>
            Une agence événementielle propose des prestations de service
            spécialisées dans la conception et l&apos;organisation de divers événements
            tels que des événements festifs, des manifestations sportives et
            culturelles, des événements professionnels
          </p>
        </div>
      </footer>)}
  </>
}

export default Page;
