import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import {api, DataProvider} from "../../contexts/DataContext";


const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
          "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
          "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
  "focus": [
    {
      "title": "World economic forum",
      "description": "Oeuvre à la coopération entre le secteur public et le privé.",
      "date": "2022-01-29T20:28:45.744Z",
      "cover": "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png"
    },
    {
      "title": "Nordic design week",
      "description": "Conférences sur le design de demain dans le digital",
      "date": "2022-03-29T20:28:45.744Z",
      "cover": "/images/teemu-paananen-bzdhc5b3Bxs-unsplash1.png"
    },
    {
      "title": "Sneakercraze market",
      "description": "Rencontres de spécialistes des Sneakers Européens.",
      "date": "2022-05-29T20:28:45.744Z",
      "cover": "/images/jakob-dalbjorn-cuKJre3nyYc-unsplash 1.png"
    }
  ]
};


describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
        <DataProvider>
          <Home />
        </DataProvider>);

    expect(await screen.findAllByTestId("card-testid")).toHaveLength(2);
  })
  it("a list a people is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
        <DataProvider>
          <Home />
        </DataProvider>);
    expect(await screen.findAllByTestId('people-card-testid')).toHaveLength(6)
  })
  it("a footer is displayed", () => {
    api.loadData = jest.fn().mockReturnValue(data);
    const {container} = render(
        <DataProvider>
          <Home />
        </DataProvider>);
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    const lastEvent = data.events.slice(-1)[0]
    const {container} = render(
        <DataProvider>
          <Home />
        </DataProvider>);
    const footer = container.querySelector('footer')
    await screen.findByText('Notre derniére prestation')
    const lastEventCardTitle = footer.querySelector('.EventCard .EventCard__title')
    expect(lastEventCardTitle.textContent).toEqual(lastEvent.title);
  })
});
