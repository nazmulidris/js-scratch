# Notes

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString

- https://www.timeanddate.com/time/map/

- JavaScript Date defines `getTimezoneOffset()` as the number of minutes
  from: current locale
  to: UTC

  - CA/PT is -7 hours from UTC
    - Date.getTimezoneOffset() is +420 (7hr)
    - Given a date in CA/PT locale, where hour = 13, in order to get the UTC
      time, we have to **add** this offset. So UTC hour is 20.

- Google `utc_offset` is in minutes, but is not the same as the JS Date! It is
  defined as the number of minutes
  from: UTC
  to: current locale

  - UTC time + UTC offset = local time.
    And, given local time and UTC offset, UTC time = local time - UTC offset.

  - CA/PT is -7 hours from UTC

    - utc_offset = -420 (7hr)
    - Given a date in CA/PT locale, where hour = 13, in order to get the UTC
      time, we have to **subtract** this offset. So UTC hour is 20.

  - Here are the docs justifying this difference from JS:

```
/**
 * The offset from UTC of the Place’s current timezone, in minutes. For example,
 * Sydney, Australia in daylight savings is 11 hours ahead of UTC, so the
 * <code>utc_offset</code> will be <code>660</code>. For timezones behind UTC,
 * the offset is negative. For example, the </code> is <code>-60</code> for Cape
 * Verde.
 */
```
