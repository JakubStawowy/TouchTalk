package pl.team.touchtalk.repositories;

public class JsonWebTokenPrefixesRepository {
    private final static String authPrefix = "Authorization";
    private final static String headerPrefix = "Bearer";

    public static String getAuthPrefix() {
        return authPrefix;
    }

    public static String getHeaderPrefix() {
        return headerPrefix;
    }
}
