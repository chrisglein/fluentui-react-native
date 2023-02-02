import { AndroidAttribute, ANDROID_RADIOBUTTON, BOOT_APP_TIMEOUT, PAGE_TIMEOUT } from '../../common/consts';
import NavigateAppPage from '../../common/NavigateAppPage';
import { RADIOGROUPV1_TEST_COMPONENT } from '../consts';
import RadioGroupV1Page from '../pages/RadioGroupV1PageObject';

// Before testing begins, allow up to 60 seconds for app to open
describe('RadioGroupV1/RadioV1 Testing Initialization', function () {
  it('Wait for app load', async () => {
    await NavigateAppPage.waitForPageDisplayed(BOOT_APP_TIMEOUT);
    expect(await NavigateAppPage.isPageLoaded()).toBeTruthy(NavigateAppPage.ERRORMESSAGE_APPLOAD);
  });

  it('Click and navigate to RadioGroupV1 test page', async () => {
    /* Click on component button to navigate to test page */
    await RadioGroupV1Page.mobileScrollToComponentButton();
    await RadioGroupV1Page.waitForButtonDisplayed(PAGE_TIMEOUT);

    await NavigateAppPage.clickAndGoToRadioGroupV1Page();
    await RadioGroupV1Page.waitForPageDisplayed(PAGE_TIMEOUT);

    expect(await RadioGroupV1Page.isPageLoaded()).toBeTruthy(RadioGroupV1Page.ERRORMESSAGE_PAGELOAD);
    expect(await RadioGroupV1Page.didAssertPopup()).toBeFalsy(RadioGroupV1Page.ERRORMESSAGE_ASSERT); // Ensure no asserts popped up
  });
});

describe('RadioGroupV1/RadioV1 Accessibility Testing', () => {
  /* Scrolls and waits for the RadioGroup to be visible on the Test Page */
  beforeEach(async () => {
    await RadioGroupV1Page.mobileScrollToTestElement();
  });

  it('RadioGroup - Verify accessibilityLabel', async () => {
    expect(
      await RadioGroupV1Page.compareAttribute(
        RadioGroupV1Page._primaryComponent,
        AndroidAttribute.AccessibilityLabel,
        RADIOGROUPV1_TEST_COMPONENT,
      ),
    ).toBeTruthy();
    expect(await RadioGroupV1Page.didAssertPopup()).toBeFalsy(RadioGroupV1Page.ERRORMESSAGE_ASSERT);
  });

  it('Validate Radio Group Class on Android', async () => {
    expect(
      await RadioGroupV1Page.compareAttribute(RadioGroupV1Page.getRadio('First'), AndroidAttribute.Class, ANDROID_RADIOBUTTON),
    ).toBeTruthy();

    expect(await RadioGroupV1Page.didAssertPopup()).toBeFalsy(RadioGroupV1Page.ERRORMESSAGE_ASSERT);
  });
});

describe('RadioGroupV1 Functional Testing', async () => {
  /* This resets the RadioGroup state by clicking/selecting the 1st Radio in the RadioGroup */
  beforeEach(async () => {
    await RadioGroupV1Page.mobileScrollToTestElement();

    await RadioGroupV1Page.resetRadioGroupSelection();
  });

  it('Click on a Radio and ensure it changes state from unselected -> selected', async () => {
    /* Validate the Radio is not initially selected */
    expect(await RadioGroupV1Page.isRadioSelected('Second')).toBeFalsy();

    /* Click on the Radio to select it */
    await RadioGroupV1Page.click(RadioGroupV1Page.getRadio('Second'));

    /* Validate the Radio is selected */
    expect(await RadioGroupV1Page.waitForRadioSelected('Second', 'Expected radio #2 to be selected by click.')).toBeTruthy();
    expect(await RadioGroupV1Page.didAssertPopup()).toBeFalsy(RadioGroupV1Page.ERRORMESSAGE_ASSERT);
  });
});