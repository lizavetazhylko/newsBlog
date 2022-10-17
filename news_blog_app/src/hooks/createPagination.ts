import { COUNT_PAGES_NUMS } from "../constants/vars";

export const createPagination = (totalCount: number, currentPage: number, countRecords: number) => {
    const countPages = Math.ceil(totalCount / countRecords);
    const middlePage = Math.floor(countPages / 2);

    const pagesNums: (number | string) [] = [1];
    
    if (countPages <= COUNT_PAGES_NUMS) {
        for (let i = 2; i <= countPages; i++) {
            pagesNums.push(i);
        }
        return pagesNums;
    }

    if (currentPage <= 4 || countPages - currentPage <= 4) {
        for (let i = 2; i <= 4; i++) {
            pagesNums.push(i);       
        }
        pagesNums.push('...', middlePage, '...');
        for (let i = 3; i >= 0; i--) {
            pagesNums.push(countPages - i); 
        }
        return pagesNums;
    }

    if (currentPage > 4 || countPages - currentPage > 4) {
        if (middlePage > currentPage + 2 && currentPage < middlePage) {
            return pagesNums.concat([2, '...', currentPage-1, currentPage, currentPage+1, '...', middlePage, '...', countPages-1, countPages]);
        }
        
        if (middlePage < currentPage - 2 && currentPage > middlePage) {
            return pagesNums.concat([2 , '...', middlePage, '...', currentPage-1, currentPage, currentPage+1, '...', countPages-1, countPages]);
        }

        if (middlePage === currentPage + 2 && currentPage < middlePage) {
            return pagesNums.concat([2, '...', currentPage-1, currentPage, currentPage+1, middlePage, middlePage+1, '...', countPages-1, countPages]);
        }

        if (middlePage === currentPage - 2 && currentPage > middlePage) {
            return pagesNums.concat([2 , '...', middlePage-1, middlePage, currentPage-1, currentPage, currentPage+1, '...', countPages-1, countPages]);
        }        

        if ( Math.abs(middlePage - currentPage) <= 1) {
            return pagesNums.concat([2, '...', currentPage-2, currentPage-1, currentPage, currentPage+1, currentPage+2, '...', countPages-1, countPages]);
        }

        return pagesNums;     
    }    

    return pagesNums;
}