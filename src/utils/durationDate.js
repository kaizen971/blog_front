import moment from 'moment';

export function durationDate(date) {
  const now = moment();
  const diffInSeconds = now.diff(date, 'seconds');

  if (diffInSeconds < 60) {
    return `il y a ${diffInSeconds} secondes`;
  } else if (now.diff(date, 'minutes') < 60) {
    return `il y a ${now.diff(date, 'minutes')} minutes`;
  } else if (now.diff(date, 'hours') < 24) {
    return `il y a ${now.diff(date, 'hours')} heures`;
  } else if (now.diff(date, 'days') < 7) {
    return `il y a ${now.diff(date, 'days')} jours`;
  } else {
    return date.format('DD/MM/YYYY');
  }
}

export function durationReading(article) {
    const mots = article.split(' ').length;
    const tempsLecture = (mots / 250); // temps de lecture en minutes (arrondi)

    const minutes = Math.floor(tempsLecture);

  const secondes = Math.round((tempsLecture - minutes) * 60);
    if(secondes === 0 && minutes === 0) {
        return `moins d'une seconde`;
    }
    if(secondes === 0) {
        return `${minutes} min`;
    }
    if(minutes === 0) {
        return `${secondes} sec`;
    }
    return `${minutes} min ${secondes} sec`;
  }
  