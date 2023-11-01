Feature: Job Listing Accessibility

  Scenario: Accessing Job Listing without Login
  Given the user is on the Job Listing page
    When the user should see the job listings
    Then the user should "see" the "Sign In To View More" prompt
  
  Scenario: Verify Skill Search Functionality
  Given the user is on the Job Listing page
    When the user enters "Java" in the job search field
    Then the job listings should be filtered to only show "skill" "Java"

  Scenario: Verify Job Title Search Functionality
  Given the user is on the Job Listing page
    When the user enters "Game Designer" in the job search field
    Then the job listings should be filtered to only show "job title" "Game Designer"

  Scenario: Verify Company Search Functionality
  Given the user is on the Job Listing page
    When the user enters "Qode" in the job search field
    Then the job listings should be filtered to only show "company name" "Qode"

  Scenario: Verify Job Type Filter Functionality for Full-time
  Given the user is on the Job Listing page
    When the user clicks on the "Full-time" job type filter
    And a message displaying the count of results found should be displayed
    Then the job listings should be filtered only show "Full-time"

  Scenario: Verify Candidate try to Sign In
    When the user clicks on the Sign In button
    And the user enters a valid email address in the email input field
    Then the user clicks on "Send Verification Link"
    And a verification link should be sent to the entered email address

  Scenario: Candidate try to apply one of the job that fit with my requirement
    Given the user has logged in with valid credentials
    And the user should "not see" the "Sign In To View More" prompt

    And the user enters "Qode" in the job search field
    And the job listings should be filtered to only show "company name" "Qode"
    When I found one of the job that fit with my requirement
    Then the user will apply the position and complete the required form