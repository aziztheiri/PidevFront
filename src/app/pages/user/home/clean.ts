import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanContent'
})
export class CleanContentPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    // List of unwanted phrases that should trigger removal of a line
    const unwantedPhrases = [
      "I don't have real-time access to specific Tunisian insurance industry news from today.",
      "Accessing that sort of information requires continuous monitoring of local Tunisian news sources and industry publications.",
      "However, general trends that *might* be relevant based on past observations and global insurance trends include:",
      "```html"
    ];

    // Split the response into lines and filter out any line that contains an unwanted phrase
    const cleaned = value
      .split('\n')
      .filter(line => {
        for (const phrase of unwantedPhrases) {
          if (line.includes(phrase)) {
            return false;
          }
        }
        return true;
      })
      .join('\n');

    return cleaned.trim();
  }
}
