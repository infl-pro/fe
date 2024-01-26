import Link from 'next/link';
import styled from 'styled-components';
import { GitHubIcon } from 'components/atoms/IconButton';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';

const Anchor = styled(Text)`
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

/**
 * 푸터
 */
const Footer = () => {
    return (
        <footer>
            <Flex backgroundColor={'gray'} padding={1}>
                <Box
                    minWidth={{ base: '100%', md: '120px' }}
                    textAllign={'center'}
                >
                    <nav>
                        <Anchor
                            as="a"
                            href="https://github.com/infl-pro"
                            target="_blank"
                        >
                            <GitHubIcon size={22} color={'white'} />
                        </Anchor>
                    </nav>
                </Box>
            </Flex>
        </footer>
    );
};

export default Footer;
