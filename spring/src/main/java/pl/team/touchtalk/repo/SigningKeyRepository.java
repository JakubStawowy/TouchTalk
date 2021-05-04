package pl.team.touchtalk.repo;

public class SigningKeyRepository {
    private final static String signingKey = "723DFCCF323D1E392B367C6DFF21E";

    public static String getSigningKey() {
        return signingKey;
    }
}
