Feature: Epicbet main UI flows (Sisu assignment)
  The goal is to show how I structure simple, maintainable tests
  for the public Epicbet site using Playwright and page objects.

  Background:
    Given I open the Epicbet homepage
    And I dismiss the cookie banner if it is visible

  @TC01 @homepage
  Scenario: Homepage loads with key elements
    Then I should see the Epicbet branding
    And I should see a navigation link to "Sports"
    And I should see a navigation link to "Casino"
    And I should see a navigation link to "Promotions"

  @TC02 @sports
  Scenario: Sports page navigation and content
    When I navigate to the "Sports" page from the main navigation
    Then I should see a Sports heading or label
    And I should see at least one sports category or events block

  @TC03 @casino
  Scenario: Casino page navigation and games
    When I navigate to the "Casino" page from the main navigation
    Then I should see a Casino heading or label
    And I should see at least one casino game or game category tile

  @TC04 @promotions
  Scenario: Promotions page navigation and offers
    When I navigate to the "Promotions" page from the main navigation
    Then I should see at least one promotion tile
    And the promotion tile text should be visible to the user
