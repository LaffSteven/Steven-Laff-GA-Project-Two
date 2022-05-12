# Steven-Laff-GA-Project-Two

The Arcane Plains Deck Builder

MTG Deck Builder

User should be able to explore a database of cards.
View and index of the available cards, and view individual card data.
Will be able to edit the cards in the database, or create new cards.

Users will be able to create a Deck, which will have a name and a card list.
Should be able to edit the deck or delete it.

Stretch Goals:
- Deck Analytics
    * Users will be able to see the card breakdown for the deck
- Filtered Views for the index pages
- A Playing field where you can draw a hand of cards from a chosen deck


Need to build:

Database:
    - Cards
    - Decks

MVC
    Models
        - Card
            * Schema
                {
                    name, color, casting cost, type, text, image
                }
            * Seed Data
        - Deck
            * Schema
                {
                    name, description, card-list
                }

    Views
        - Card
            * Card List (Index)
                :Stretch
                    * Filters
                        - Lands
                        - Cretures
                        - Spells
            * Card Info (Show)
            * Edit Card (Update)
            * Add New Card (Create)

        - Deck
            * Deck List (Index)
            * Deck Info (Show)
            * Deck Manager (Update)
            * Create New Deck (Create)
