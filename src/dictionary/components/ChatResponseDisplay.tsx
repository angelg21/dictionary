

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './css/swiper-custom.css'; // Importa el archivo con los estilos personalizados
import { RenderBiography } from './reponses/RenderBiography';
import { RenderList } from './reponses/RenderList';

interface Multimedia {
    images: { link: '', description: '' }[]; // Array de URLs de imágenes
    videos: { link: '', description: '' }[]; // Array de URLs de videos
    audios: { link: '', description: '' }[];
    documents: { link: '', description: '' }[] // Array de URLs de audios
}

interface Biography {
    title: string;
    text: string;
    multimedia: Multimedia;
}

interface ComparisonItem {
    title: string;
    multimedia: Multimedia;
}

interface Comparison {
    items: ComparisonItem[];
}

interface ListItem {
    title: string;
    text: string;
    multimedia: Multimedia;
}

interface List {
    title: string;
    items: ListItem[];
}

interface Similarity {
    title: string;
    items: ListItem[];
}


interface Model {
    text: string
}

// Definición del tipo ChatResponse
interface ChatResponse {
    data: {
        type: 'biography' | 'comparison' | 'list' | 'similarity' | 'multimedia' | 'model'; // Los tipos que puede recibir
        query: string;
        result: Biography | Comparison | List | Similarity | Multimedia | Model; // Definición más específica de result
    }
}

// Componente principal
const ChatResponseDisplay: React.FC<ChatResponse> = ({ data }) => {

    const { type, result } = data;

    // const renderComparison = (comp: Comparison) => (
    //     <div>
    //         {comp.items.map((item, index) => (
    //             <div key={index}>
    //                 <h2 className="text-lg font-semibold">{item.title}</h2>
    //                 <p>{item.title}</p>
    //                 {/* Renderizar multimedia */}
    //                 {item.multimedia.images.length > 0 && (
    //                     <div>
    //                         {item.multimedia.images.map((img, imgIndex) => (
    //                             <img key={imgIndex} src={img} alt={`Imagen ${imgIndex + 1}`} />
    //                         ))}
    //                     </div>
    //                 )}
    //                 {/* Similar para videos y audios */}
    //             </div>
    //         ))}
    //     </div>
    // );


    // const renderMultimedia = (media: MultimediaQA) => (
    //     <div className="p-4">
    //         <h2 className="text-lg font-bold">{media.title}</h2>
    //         {/* Renderizar multimedia */}
    //         {media.multimedia.images.length > 0 && (
    //             <div>
    //                 {media.multimedia.images.map((img, imgIndex) => (
    //                     <img key={imgIndex} src={img} alt={`Imagen ${imgIndex + 1}`} />
    //                 ))}
    //             </div>
    //         )}
    //         {/* Similar para videos y audios */}
    //     </div>
    // );

    return (
        <div>
            {type === 'biography' && RenderBiography(result as Biography)}
            {(type === 'list' || type === 'similarity') && RenderList(result as List)}
            {/* {type === 'comparison' && renderComparison(result as Comparison)}
            {type === 'similarity' && renderSimilarity(result as Similarity)}
            {type === 'multimedia' && renderMultimedia(result as MultimediaQA)} */}
            {/* Puedes agregar más tipos si es necesario */}
        </div>
    );
};

export default ChatResponseDisplay;
