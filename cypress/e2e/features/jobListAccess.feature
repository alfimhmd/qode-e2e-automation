Feature: Job Listing Accessibility

  Background:
    Given the user is on the Job Listing page

  Scenario: Accessing Job Listing without Login
    When the user should see the job listings
    Then the user should see the "Sign In To View More" prompt
  
  Scenario: Verify Job Search Functionality
    When the user enters "Java" in the job search field
    Then the job listings should be filtered to show only "Java" related jobs

  Scenario: Verify Job Type Filter Functionality for Full-time
    When the user clicks on the "Full-time" job type filter
    Then a message displaying the count of results found should be displayed
    And the same count of job listings should be displayed

  Scenario: Verify Job Type Filter Functionality for Part-time
    When the user clicks on the "Part-time" job type filter
    Then the message "0 Result Found" should be displayed
    And the suggestion "We couldn't find any jobs matching your search query. Consider refining your keywords or criteria for a more tailored hunt." should be displayed

  Scenario: Verify Job Search with No Results
    When the user enters "NonexistentSkill" in the job search field
    Then the message "0 Result Found" should be displayed
    And the suggestion "We couldn't find any jobs matching your search query. Consider refining your keywords or criteria for a more tailored hunt." should be displayed

  Scenario: Verify Location Filter Functionality
    When the user selects "New York" from the location field
    Then the job listings should be filtered to show only jobs in "New York"

  Scenario: Verify Skills/Role Filter Functionality
    When the user clicks on the "Backend" skill/role button
    Then the job listings should be filtered to show only "Backend" roles

  Scenario: Verify Sorting Functionality
    When the user selects "Last week" from the sorting options
    Then the job listings should be sorted to show only jobs posted in the "Last week"

  Scenario: Verify Sign In Prompt
    When the user clicks on a job listing
    Then a prompt to sign in should appear

  Scenario: Verifying Reset Functionality
    Given the user has applied some filters and sorting
    When the user clicks on the Reset button
    Then all filters and sorting should be cleared
    And the job listings should return to the default view

  Scenario: Verify Sign In to View More
    When the user clicks on a job listing to view more details
    Then a prompt to sign in should appear

  Scenario: Verify Candidate try to Sign In
    Given the user clicks on the "Sign In" link
    When the user has navigated to the Career Auth page
    And the user enters a valid email address in the email input field
    Then the user clicks on "Send Verification Link"

  Scenario: Candidate successfully Sign In
    Given a verification link should be sent to the entered email address
    When the user has logged in with valid credentials
    Then the user should not see the "Sign In To View More" prompt