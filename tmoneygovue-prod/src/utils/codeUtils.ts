export function getRentTypeGrpCdFromUtlzSvcDvsCd(utlzSvcDvsCd: string) {
  switch (utlzSvcDvsCd) {
    case 'M':
    case 'J':
    case 'E':
    case 'I':
      return 'E';
    case 'X':
    case 'K':
    case 'G':
    case 'W':
    case 'Q':
      return 'X';
    case 'T':
    case 'D':
      return 'T';
    case 'A':
      return 'A';
    default:
      return 'NONE';
  }
}
