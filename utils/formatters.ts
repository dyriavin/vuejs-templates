/**
 * Format a date string into a more readable format
 * 
 * @param dateString ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return '';
  }
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

/**
 * Truncate a string to a specified length
 * 
 * @param str String to truncate
 * @param length Maximum length
 * @param suffix Suffix to add after truncation (default: '...')
 * @returns Truncated string
 */
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (!str) return '';
  if (str.length <= length) return str;
  
  return str.substring(0, length).trim() + suffix;
}

/**
 * Format a number as currency
 * 
 * @param value Number to format
 * @param currency Currency code (default: 'USD')
 * @param locale Locale code (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number, 
  currency: string = 'USD', 
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value);
} 