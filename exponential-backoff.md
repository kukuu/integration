# Exponential Backoff Strategy 

Exponential backoff is a retry strategy commonly used in distributed systems and network communication to handle transient failures, such as temporary server unavailability, 
rate limiting, or network interruptions. 

Instead of immediately retrying a failed operation repeatedly, the system waits for an increasing amount of time between retries, with the wait time growing exponentially.

## How It Works
Initial Retry: After a failure, the system waits for a small amount of time before retrying (e.g., 1 second).
Subsequent Retries: If the operation fails again, the wait time increases exponentially, usually doubling each time (e.g., 1 second → 2 seconds → 4 seconds → 8 seconds).
Maximum Limit: The backoff period often has a maximum cap (e.g., 30 seconds) to prevent unbounded waiting.
Jitter: To avoid synchronized retries from multiple clients, random "jitter" is often added to the backoff interval. For example, instead of waiting exactly 4 seconds, the system might wait between 3.5 and 4.5 seconds.

## Formula
If the initial wait time is T, the time before the n-th retry can be calculated as:

![image](https://github.com/kukuu/integration/blob/main/backoff-calculator.png)
