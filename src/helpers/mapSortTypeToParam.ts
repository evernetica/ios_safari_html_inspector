export const mapSortTypeToParam = (type: string) => {
    switch (type) {
        case 'mostRecent':
            return 'mr';
        case 'highlyRecommended':
            return 'hr';
        case 'mostDiscussed':
            return 'md';
        default:
            return 'mr';
    }
};