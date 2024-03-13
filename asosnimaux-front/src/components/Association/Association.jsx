// Styles
import "./association.scss";
// Components
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import YoutubeVideo from "../YoutubeVideo/YoutubeVideo";
import { FaAngleRight } from "react-icons/fa6";
// React
import { Link } from "react-router-dom";
// Constants
import { APP_ROUTES } from "../../constants/route.const";

const Association = () => {
  return (
    <div className="association__page">
      <div className="title-wrapper">
        <h1>L'Association</h1>
      </div>
      <Breadcrumbs>
        <li className="breadcrumbs__link">
          <Link to={APP_ROUTES.HOME} >
            Accueil
          </Link>
          <FaAngleRight className="breadcrumbs__icon" />
        </li>
        <li className="breadcrumbs__link">
          <p>L'Association</p>
        </li>
      </Breadcrumbs>
      <article className="association" role="presentation">
        <div className="association__header">
          <div className="association__text">
            <h2>Présentation d'ASOS'nimaux</h2>
            <p><strong>ASOS'nimaux est un refuge dédié à la protection, au secours et à l'amour des animaux.</strong></p>
            <p>Depuis notre création, nous avons travaillé sans relâche pour créer un sanctuaire où les animaux démunis peuvent trouver un refuge, de l'affection et une seconde chance.</p>
          </div>
          <div className="association__video">
            <YoutubeVideo YTVideoID={"FBMsQKNfT0o"} />
          </div>
        </div>

        <div className="association__wrapper__values-and-mission">
          <section className="association__values">
            <div className="association__text association__values--bg--c">
              <h3>Nos valeurs</h3>
              <p>Chez ASOS'nimaux, nous croyons fermement en des valeurs fondamentales qui guident chacune de nos actions. La <strong>compassion</strong> est au cœur de notre approche, car nous considérons chaque vie animale comme précieuse. Le <strong>respect</strong> envers toutes les créatures, la <strong>responsabilité</strong> envers leur bien-être et l'<strong>amour inconditionnel</strong> sont les piliers de notre engagement quotidien.</p>
            </div>
            <div className="association__img association__values__img">
              <img loading="lazy" src="./src/assets/imgs/patty.webp" alt="Chiot marron du nom de Patty qui se fait caresser sous le menton" />
            </div>
          </section>

          <section className="association__mission">
            <div className="association__text association__mission--bg--c">
              <h3>Notre mission</h3>
              <p><strong>Sauver</strong>, <strong>soigner</strong> et <strong>placer</strong> les animaux dans des foyers aimants. Chaque jour, notre équipe dévouée travaille ardemment pour secourir les animaux maltraités, les soigner et leur offrir une chance de trouver un foyer aimant. Nous cherchons également à <strong>sensibiliser</strong> le public à la cause animale, encourageant une coexistence harmonieuse entre les humains et les animaux.</p>
            </div>
            <div className="association__img association__mission__img">
              <img loading="lazy" src="./src/assets/imgs/garfield-simba.webp" alt="Un chien, Simba, et un chat, Garfield, allongés sur le dos dans l'herbe" />
            </div>
          </section>
        </div>

        <section className="association__story">
          <div className="association__text association__story--bg--c">
            <h3>Notre histoire</h3>
            <p>ASOS'nimaux, évoluant depuis maintenant trois ans, a commencé avec un groupe passionné de défenseurs des animaux déterminés à changer la donne pour nos amis à quatre pattes. Nos débuts modestes n'ont pas été exempts de défis, mais chaque obstacle a renforcé notre engagement envers la cause animale.</p>
            <p>Au cours de ces trois années, nous avons grandi en tant qu'association, sauvant de nombreuses vies animales et élargissant notre impact. Les premiers jours étaient parfois difficiles, mais grâce à la résilience de notre équipe et au soutien continu de notre communauté, nous avons surmonté chaque défi avec détermination.</p>
            <p>Chaque animal secouru représente une histoire de survie et d'espoir, et ces transformations continuent de nous motiver. Des animaux maltraités retrouvant la santé, des liens indéfectibles formés lors d'adoptions réussies, et des moments d'émotion partagée entre nos bénévoles et nos pensionnaires sont autant de chapitres qui définissent notre histoire.</p>
            <p>Aujourd'hui, ASOS'nimaux, avec ses trois années d'existence, n'est pas simplement un refuge, mais une famille unie par la passion commune de protéger et de soigner les animaux. Nous sommes reconnaissants envers chaque personne qui a contribué à ces trois années d'histoire, chaque donateur, bénévole et adoptant, car c'est grâce à vous que notre histoire continue de s'écrire, remplie d'amour et de compassion pour nos amis à quatre pattes. Merci de faire partie de notre parcours ASOS'nimaux.</p>
          </div>
          <div className="association__img association__story__img">
            <img loading="lazy" src="./src/assets/imgs/kitty.webp" alt="Chaton du nom de kitty gris tigré qui regarde en l'air" />
          </div>
        </section>

        <section className="association__how-to-help">
          <div className="association__text association__how-to-help--bg--c">
            <h3>Comment vous pouvez aider</h3>
            <p>Vous pouvez contribuer de différentes manières à notre cause. Faites un don pour soutenir nos efforts, devenez bénévole pour apporter directement votre aide aux animaux, ou envisagez l'adoption pour offrir un foyer aimant à l'un de nos pensionnaires. Explorez nos différentes options de soutien pour découvrir comment vous pouvez faire une réelle différence dans la vie des animaux que nous aidons.</p>
          </div>
          <div className="association__video association__how-to-help__video">
            <video poster="./src/assets/videos/poster.webp" controls>
              <source src="./src/assets/videos/cats-asosnimaux.webm" type="video/webm" />
              <source src="./src/assets/videos/cats-asosnimaux.mp4" type="video/mp4" />
              <p>
                Votre navigateur ne prend pas en charge le format vidéo.
              </p>
            </video>
          </div>
          <ul className="association__how-to-help__list">
            <li className="association__text association__how-to-help__item">
              <p><strong>Faire un don</strong></p>
              <p>chaque euro compte et permet de fournir des soins médicaux, de la nourriture et des installations appropriées.</p>
            </li>
            <li className="association__text association__how-to-help__item">
              <p><strong>Bénévolat</strong></p>
              <p>rejoignez notre équipe en tant que bénévole pour participer activement au bien-être des animaux et à nos initiatives communautaires.</p>
            </li>
            <li className="association__text association__how-to-help__item">
              <p><strong>Adoption</strong></p>
              <p>envisagez d'adopter l'un de nos adorables animaux pour lui offrir une nouvelle vie pleine de bonheur.</p>
            </li>
          </ul>
        </section>

        <section className="association__thanks">
          <div className="association__text association__thanks--bg--c">
            <h3>Remerciements</h3>
            <p>Nous souhaitons exprimer notre gratitude envers tous ceux qui ont contribué à faire d'ASOS'nimaux une réalité au cours des trois dernières années. Votre soutien a été la pierre angulaire de notre succès et a permis d'accomplir des miracles pour nos amis à quatre pattes. Nous sommes impatients de continuer cette belle histoire ensemble.</p>
            <p>Merci de faire partie de la famille ASOS'nimaux.</p>
          </div>
          <div className="association__img association__thanks__img">
            <img loading="lazy" src="./src/assets/imgs/thankyou.webp" alt="Un chien noir qui tient une carte 'just to say thank you' dans sa gueule" />
          </div>
        </section>
      </article>
    </div>
  );
}

export default Association;